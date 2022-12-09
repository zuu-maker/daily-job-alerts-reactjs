import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
// import { sanitize } from '../../../utils/miscellaneous';
// import Loading from '../../loading';

const useStyles = makeStyles({
  button:{
      height:"55px !important",
      
      // display:"flex",
      // justifyContent:"space-between",
      // color: "#56ADF2"
  },
  container:{
    marginLeft:"32px !important",
    marginTop:"26px !important"
    // display:"flex",
    // justifyContent:"space-between",
    // color: "#56ADF2"
},
  
});

const NewsletterForm = ( { status, message, onValidated }) => {

  const classes = useStyles()
  const [ error, setError ] = useState(null);
  const [ email, setEmail ] = useState(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {

    setError(null);

    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });
    setEmail('')
    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = ( event ) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if ( !message ) {
      return null;
    }
    const result = message?.split('-') ?? null;
    if ( "0" !== result?.[0]?.trim() ) {
      return message;
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ;
  }

  return (
    <div className={classes.container}>
      <h3 style={{color:'gray'}}> Subscribe to newsletter</h3>
      {/*  */}
      <Stack direction="row">
        <div >
          <TextField
          
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="Your email"
            value={email}
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </div>
        <div >
            <Button className={classes.button} onClick={handleFormSubmit} size="large" variant="contained" endIcon={<SendIcon />}>
                Subscribe
            </Button>
        </div>
      </Stack>
      <div className="min-h-42px">
        { 'sending' === status ?'loading..': null }
        {'error' === status || error ? (
          <div
            className="text-red-700 pt-2"
            dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
          />
        ) : null }
        {'success' === status && 'error' !== status && !error && (
          <div className="text-green-200 font-bold pt-2" dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </div>
    </div>
  );
}

export default NewsletterForm
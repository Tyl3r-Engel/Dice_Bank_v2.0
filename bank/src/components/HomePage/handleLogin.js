import axios from 'axios';

export default async function handleLogin (e, { userName, userPass }, setFormValues, setHasFailed, setAuth) {
  e.preventDefault()
  try {
    const { data } = await axios.post('/login',
      {
        userName,
        userPass
      },
      {
        headers : 'application/json',
        withCredential : true
      }
    )
    console.log(data)
    const accessToken = data?.accessToken
    setAuth({
      isAuth : true,
      userName : userName,
      userPass : userPass,
      accessToken
    })
    setFormValues({userName : '', userPass : '', errMsg : ''})
  } catch({ response: { status, data: message } }) {
    switch (status) {
      case 401:
        setFormValues({userName : '', userPass : '', errMsg : message})
        break;

      default:
        break;
    }
    setHasFailed(true)
  }
}
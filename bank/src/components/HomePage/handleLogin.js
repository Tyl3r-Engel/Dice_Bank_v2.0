import axios from '../../api/axios';

export default async function handleLogin (e, { userName, userPass }, setFormValues, setHasFailed, setAuth) {
  e.preventDefault()
  try {
    const { data } = await axios.post('/login',
      {
        userName,
        userPass
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localHost:9999',
          },
        withCredentials : true
      }
    )
    const accessToken = data?.accessToken
    setAuth({
      isAuth : true,
      userid : data.id,
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
        setFormValues({userName : '', userPass : '', errMsg : message})
        break;
    }
    setHasFailed(true)
  }
}
import React from 'react'

const Context = React.createContext({})

// export function PeerContext({ children }) {
//   const [jwt, setJwt] = useState(
//     () => window.sessionStorage.getItem('jwt')
//   )

//   return <Context.Provider value={{ jwt, setJwt }}>
//     {children}
//   </Context.Provider>
// }

export default Context
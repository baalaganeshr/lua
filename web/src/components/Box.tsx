import { fetchNui, useNuiEvent } from "@utilities/utils";
import { useState } from "react";
import '@components/box.scss'

export const Box: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false); // change to true to see the UI.

  // useNuiEvent from @utilities/utils.ts to await NUI Messages easily.
  useNuiEvent('openBox', (data: any) => {
    console.log(JSON.stringify(data)) // this'll print the data sent to UI.
    setVisible(true) // this sets the UI to visible.
  })


  const CloseUI = () => {
    fetchNui('closeBox')
      // using .then when callback from client is true.
      .then(() => { console.log("box is now closed :)") })
      // using .catch to log errors if callback from client is not received or false.
      .catch((e) => { console.log('\'was unable to close the box :(') })
  }


  if (!visible) return // prevents UI from displaying when visible is false.
  return (
    <div className="container">
      <div className="box">
        <h1>Edit src/components/box.tsx and box.css to change me!</h1>
        <div className="close"
          onClick={CloseUI}>Close</div>
      </div>
    </div>
  )
}

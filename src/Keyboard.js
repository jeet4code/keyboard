import {useState, useEffect} from "react";


export default function Keyboard() {
 const obj = {};
 "QWERTYUIOPASDFGHJKLZXCVBNM".split("").map(key => ({
    selected: false,
    value: key
 })).forEach((elem, i) => {
  obj[`${elem.value}`] = elem
 });

  const [keys, setKeys ] = useState(obj);

  useEffect(() => {
    function handler(event) {
      const pressedKey = event.key.toUpperCase();
      if(keys[pressedKey]) {
        setKeys((keys) => ({
          ...keys, ...{[pressedKey]: {value:'-', selected: true}}
        }))
      }
      
      console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    }
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown',handler);
    }
  }, []);
  

  return (
    <div className="keyboard">
      {Object.entries(keys).map(key => {
        return <div key={key[0]} className={`key ${key[1].selected && 'selected' } ${key[1].value == '.' && 'spacer'}`}  >{key[1].value}</div>
      })}
    </div>
  )
}
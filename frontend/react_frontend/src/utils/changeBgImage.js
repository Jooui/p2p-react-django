import bg1 from "../assets/images/background/bg1.jpg"
import bg2 from "../assets/images/background/bg2.png"

let changeBgImage = () => {
  let bg = [bg1,bg2]
  let current = 0;
  
  let nextBackground = () => {
      current++;
      current = current % bg.length;
      document.body.style.backgroundImage = `url(${bg[current]})`;
  }
  
  setInterval(nextBackground, 10000);
  document.body.style.backgroundImage = `url(${bg[1]})`;
}

export default changeBgImage;
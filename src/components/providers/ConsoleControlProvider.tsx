import { useEffect } from "react";

interface props {
  children: React.ReactNode;
}

export default function ConsoleControl({ children }: props) {
  useEffect(() => {
    console.log(
      `
%cBienvenido a%c
███████  ██████  ██████  ███    ██ ███████ ██   ██ ████████ 
██      ██      ██    ██ ████   ██ ██       ██ ██     ██    
█████   ██      ██    ██ ██ ██  ██ █████     ███      ██    
██      ██      ██    ██ ██  ██ ██ ██       ██ ██     ██    
███████  ██████  ██████  ██   ████ ███████ ██   ██    ██    
      
%cCon que te acabamos de pillar con las manos en la masa, ¡eh!

%cTranquilo... %cno te preocupes, no vamos a llamar ni a la CIA, ni al CNI, eso sí, estate con ojo que te estamos viendo 👀
    `,
      "font-weight: 700; color: #383b39;",
      "color: #EF385C;",
      "color: rainbow",
      "font-weight: 700; color: #383b39;",
      "font-weight: 500"
    );

    if (process.env.DEBUG) {
      console.log = () => null;
      console.warn = () => null;
      console.error = () => null;
    }
  }, []);

  return children;
}

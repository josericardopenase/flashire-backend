import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import useAppSelector from "@storage/hooks/useAppSelector";

export default function ConfettiProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { width, height } = useWindowSize();
  const confetti = useAppSelector((state) => state.global.confetti);

  return (
    <>
      <Confetti
        key="confetti_provider"
        numberOfPieces={confetti ? 200 : 0}
        style={{ zIndex: 3000, width: "100%" }}
        height={height}
      />
      {children}
    </>
  );
}

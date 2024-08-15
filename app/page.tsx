"use client";

import { useEffect, useState } from "react";

type Coordinates = { x: number; y: number };

export default function Home() {
  const [mobileClicks, setMobileClicks] = useState(0);
  const [screenSize, setScreenSize] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const [coords, setCoords] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [clicked, setClicked] = useState(false);
  const [tipAmounts, setTipAmounts] = useState<number[]>([
    25, 50, 75, 100, 150,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenSize({
        x: window.innerWidth - 100,
        y: window.innerHeight - 100,
      });
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <main className="flex flex-col min-h-screen gap-8 items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-8">
        {tipAmounts.map((tipAmount) => (
          <button
            id={`tip-${tipAmount}`}
            key={tipAmount}
            className="bg-blue-500/60 hover:bg-blue-400/60 transition-all text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              if (tipAmount === 1500) {
                let confirmed = false;
                while (!confirmed) {
                  confirmed = confirm("Are you sure you want to tip 1500%?");
                }

                alert("Thank you for your generosity!");
              }

              setTipAmounts((prev) =>
                prev.filter((amount) => amount !== tipAmount)
              );

              if (tipAmounts.length <= 1) {
                setTipAmounts([1500]);
              }
            }}
          >
            Tip {tipAmount}%
          </button>
        ))}
      </div>
      <div
        className="transition-all"
        style={{
          position: clicked ? "absolute" : "unset",
          padding: clicked ? "1rem" : "0",
          top: coords.y,
          left: coords.x,
        }}
        onMouseEnter={() => {
          if (!clicked) setClicked(true);
          setCoords({
            x: Math.random() * screenSize.x,
            y: Math.random() * screenSize.y,
          });
        }}
        // onFocus={(e) => {
        //   e.target.blur();
        //   document
        //     .getElementById(`tip-${tipAmounts[tipAmounts.length - 1]}`)
        //     ?.focus();
        // }}
      >
        <button
          className="bg-red-500/60 hover:bg-red-400/60 transition-all text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (mobileClicks < 20) {
              setMobileClicks((prev) => prev + 1);
              return;
            }
            let confirmed = true;
            while (confirmed) {
              confirmed = confirm("Are you sure you want to tip 0%?");
            }

            alert("Thank you for reconsidering!");
          }}
        >
          No tip
        </button>
      </div>
    </main>
  );
}

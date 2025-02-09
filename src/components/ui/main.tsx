import React, { ReactNode } from "react";

const Main = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={`w-[95%] mx-auto min-h-screen text-muted-foreground ${className}`}
    >
      {children}
    </main>
  );
};

export default Main;

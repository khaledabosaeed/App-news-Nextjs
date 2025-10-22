// app/(second)/layout.tsx
import Headr from "../_Components/Header/Headr";

export default function SecondLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Headr />
      {children}
    </>
  );
}

"use client";

import HeroMain from "../components/HeroMain";
import Programs from "../components/Programs";
import Advantages from "../components/Advantages";
import News from "../components/News";
import { useFaculty } from "../contexts/FacultyContext";

export default function HomeContent() {
  const faculty = useFaculty();

  return (
    <>
      <HeroMain data={faculty?.Hero} />
      <Programs data={faculty?.Lectures} />
      <Advantages data={faculty} />
      <News />
    </>
  );
}

import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {ChevronRight} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";

const aboutStats = [
  { label: "Years of experience", value: "1+" },
  { label: "Technologies mastered", value: "15+" },

];

const projects = [
  {
    title: "not sure",
    description: "not decided yet",
    image: "",
    href: "",
  },
  {
    title: "no idea da",
    description: " i think i should start",
    image: "",
    href: "",
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
      

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Bhargavi.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                still not decided about who i am
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=bhargavihegde2002@gmail.com&su=Hello&body=I%20wanted%20to%20connect%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>
            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <img
                src="abc.png"
                className="w-full h-full object-contain"
              />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m a noob  full-stack developer{" "}
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>īī
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
      
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Pixel-perfect.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, Here are some of my favorites:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>


        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently not looking for a job rn.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bhargavihegde2002@gmail.com&su=Hello&body=I%20wanted%20to%20connect%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-6">Get in touch</Button>
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}



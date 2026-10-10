
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ProjectContent {
  title: string;
  description: string;
}

interface Project {
  id: number;
  project_name: string;
  content: ProjectContent[];
  images: string[];
  created_at: string;
  updated_at: string;
}

interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

const ProjectsSection = () => {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dashboard.mtliftgroup.ly/api/projects"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data: ProjectsResponse = await response.json();

        if (data.success) {
          setProjects(data.data);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );

        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;

    return tmp.textContent || tmp.innerText || "";
  };

  const projectsWithImages = projects.filter(
    (project) => project.images && project.images.length > 0
  );

  const projectsWithoutImages = projects.filter(
    (project) => !project.images || project.images.length === 0
  );

  if (loading) {
    return (
      <section className="min-h-screen w-full snap-start flex flex-col justify-start py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <div className="accent-bar" />

            <span className="section-label">
              {t("projects.label")}
            </span>

            <h2 className="section-title">
              {t("projects.title")}
            </h2>

            <p className="section-desc">
              {t("projects.description")}
            </p>
          </div>

          <div className="space-y-24">
            {[1, 2].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />

                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  </div>
                </div>

                <div className="w-full h-96 bg-muted rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen w-full snap-start flex flex-col justify-start py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <div className="accent-bar" />

            <span className="section-label">
              {t("projects.label")}
            </span>

            <h2 className="section-title">
              {t("projects.title")}
            </h2>
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("projects.error")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full snap-start flex flex-col justify-start py-24 bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />

          <span className="section-label">
            {t("projects.label")}
          </span>

          <h2 className="section-title">
            {t("projects.title")}
          </h2>

          <p className="section-desc">
            {t("projects.description")}
          </p>
        </div>

        {/* Projects with images */}
        {projectsWithImages.length > 0 && (
          <div className="space-y-24">
            {projectsWithImages.map((project, index) => (
              <div key={project.id}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Project Details */}
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold font-sans text-foreground">
                      {project.project_name}
                    </h3>

                    <div className="prose prose-lg text-muted-foreground">
                      <ul className="list-disc pl-5 space-y-3 marker:text-secondary">
                        {project.content.map((item, i) => {
                          const description = stripHtml(
                            item.description
                          );

                          return (
                            <li key={i}>
                              {item.title && (
                                <strong className="text-foreground">
                                  {item.title}
                                </strong>
                              )}

                              {item.title && description && " — "}

                              {description}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Project Slideshow */}
                  <div className="w-full relative flex justify-center">
                    <Carousel
                      className="w-full max-w-sm"
                      plugins={[
                        Autoplay({
                          delay: 4000,
                          stopOnInteraction: false,
                        }),
                      ]}
                      opts={{
                        loop: true,
                      }}
                    >
                      <CarouselContent>
                        {project.images.map((image, imgIndex) => (
                          <CarouselItem key={imgIndex}>
                            <div className="p-1">
                              <Card className="border-0 shadow-none bg-transparent">
                                <CardContent className="flex aspect-[3/4] items-center justify-center p-0 overflow-hidden rounded-xl bg-muted/20">
                                  <img
                                    src={image}
                                    alt={`${project.project_name} ${t(
                                      "projects.imageView"
                                    )} ${imgIndex + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-none z-10" />

                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-none z-10" />
                    </Carousel>
                  </div>
                </div>

                {/* Separator between projects */}
                {index < projectsWithImages.length - 1 && (
                  <Separator className="mt-24 bg-border/40" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects without images */}
        {projectsWithoutImages.length > 0 && (
          <div className="mt-24">
            {projectsWithImages.length > 0 && (
              <Separator className="mb-16 bg-border/40" />
            )}

            <div className="max-w-2xl mb-10">
              <h3 className="text-2xl font-bold font-sans text-foreground mb-4">
                {t("projects.otherTitle")}
              </h3>

              <p className="text-muted-foreground">
                {t("projects.otherDescription")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectsWithoutImages.map((project) => {
                const firstContentTitle =
                  project.content[0]?.title || "";

                return (
                  <Card
                    key={project.id}
                    className="bg-card border-border/50 hover:border-secondary/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <h4 className="font-bold font-sans text-lg mb-2 text-foreground/90">
                        {project.project_name}
                      </h4>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {firstContentTitle}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

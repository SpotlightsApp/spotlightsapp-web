import type { Metadata } from "next";
import { GraduationCap, MapPin, Pencil, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getStudent } from "@/lib/data";

export const metadata: Metadata = { title: "My profile — Spotlight" };

export default function ProfilePage() {
  const s = getStudent();
  const initials = s.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Header card */}
          <Card className="overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-accent to-accent-hover" />
            <div className="px-6 pb-6">
              <div className="-mt-10 flex items-end justify-between">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarFallback className="bg-foreground text-2xl text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" /> Edit profile
                </Button>
              </div>
              <h1 className="mt-4 font-display text-2xl text-foreground">
                {s.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{s.headline}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  {s.university}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {s.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  Class of {s.gradYear}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">About</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.about}</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">Education</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <div className="font-medium">{s.university}</div>
                <div className="text-sm text-muted-foreground">
                  {s.major} · Expected {s.gradYear}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.skills.map((skill) => (
                <Badge key={skill} variant="neutral" size="md">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold">Open to</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.openTo.map((t) => (
                <Badge key={t} variant="accent" size="md">
                  {t}
                </Badge>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Profile strength</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-semibold text-accent-strong">
                {s.profileCompletion}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${s.profileCompletion}%` }}
              />
            </div>
          </Card>
        </aside>
      </div>
    </Container>
  );
}

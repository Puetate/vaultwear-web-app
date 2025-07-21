import { useMantineColorScheme } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { privacyPolicyData } from "./data/privacyPolicyData";

export const Route = createFileRoute("/(public)/privacy-policy/")({
  component: RouteComponent
});

function RouteComponent() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className="container mx-auto py-6 text-pretty">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold dark:text-white">Política de Privacidad</h1>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-50">
            Ultima actualización: 21/07/2025
          </h2>
        </div>
        <img
          src={colorScheme == "dark" ? "/logo.svg" : "/logo-dark.svg"}
          alt="RUMI logo"
          className="w-52"
        />
      </header>
      <hr className="my-6 border-t border-gray-700" />
      <p className="mb-6">
        Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información
        personal de los usuarios de nuestra aplicación móvil RUMI.
      </p>
      <main className="pl-6">
        {privacyPolicyData.map((section, index) => (
          <section key={index} className="mb-4">
            <h2 className="text-xl font-semibold dark:text-white">{section.title}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: section.content
              }}
            />
          </section>
        ))}
      </main>
    </div>
  );
}

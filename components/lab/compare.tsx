"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/sonner";
import { labReplicas } from "@/components/lab/lab-home";

const labFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("E-mail inválido."),
  message: z.string().trim().min(10, "Escreva pelo menos uma frase."),
});

type LabFormValues = z.infer<typeof labFormSchema>;

const fieldClass =
  "h-auto min-h-0 rounded-xl border-border bg-card px-4 py-3 text-sm shadow-none dark:bg-card focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary";

const buttonClass =
  "h-auto w-full rounded-xl px-6 py-3 text-sm font-medium hover:bg-primary/90";

const rawFieldClass =
  "h-9 rounded-md border-[#d4d4d4] bg-white px-3 text-sm text-[#171717] shadow-none placeholder:text-[#a3a3a3] dark:border-[#d4d4d4] dark:bg-white dark:text-[#171717]";

const rawButtonClass =
  "h-9 w-full rounded-md bg-[#171717] text-white hover:bg-[#171717] dark:bg-[#171717] dark:text-white";

export function LabBench() {
  const [notice, setNotice] = useState<string | null>(null);
  const form = useForm<LabFormValues>({
    resolver: zodResolver(labFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: LabFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const message = `Olá, ${values.name}. Nada foi enviado.`;
    setNotice(message);
    form.reset();
    toast.success(message);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <header className="max-w-2xl space-y-3">
          <p className="font-mono text-xs tracking-widest text-primary">LAB</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            O mesmo componente, duas aparências
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            À esquerda está o shadcn como uma instalação nova entrega: fundo
            branco, botão preto, canto de 8px. À direita, o mesmo{" "}
            <span className="font-mono text-foreground">Button</span> e o mesmo{" "}
            <span className="font-mono text-foreground">Input</span> com a
            paleta deste site.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {labReplicas.map((lab) => (
              <Link
                key={lab.id}
                href={lab.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-primary"
              >
                {lab.n} {lab.name}
              </Link>
            ))}
          </div>
        </header>

        <div className="grid items-start gap-6 md:grid-cols-2">
          <section
            className="rounded-xl p-6"
            style={{ background: "#ffffff", color: "#171717" }}
          >
            <p className="font-mono text-xs tracking-widest" style={{ color: "#737373" }}>
              INSTALAÇÃO CRUA
            </p>
            <h2 className="mt-2 text-lg font-semibold">Branco e preto</h2>
            <p className="mt-1 text-sm" style={{ color: "#737373" }}>
              Fundo #ffffff, botão #171717, raio 8px.
            </p>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Nome</p>
                <Input
                  readOnly
                  tabIndex={-1}
                  placeholder="Alex Maciel"
                  className={rawFieldClass}
                  style={{ background: "#ffffff", color: "#171717", borderColor: "#d4d4d4" }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Mensagem</p>
                <Textarea
                  readOnly
                  tabIndex={-1}
                  rows={4}
                  placeholder="Uma frase sobre o que você precisa."
                  className={`${rawFieldClass} min-h-28 resize-none py-2`}
                  style={{ background: "#ffffff", color: "#171717", borderColor: "#d4d4d4" }}
                />
              </div>
              <Button
                type="button"
                tabIndex={-1}
                className={`${rawButtonClass} pointer-events-none`}
                style={{ background: "#171717", color: "#ffffff" }}
              >
                Enviar mensagem
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="px-1">
              <p className="font-mono text-xs tracking-widest text-primary">
                NESTE SITE
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">
                Terracota sobre pedra
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fundo #292524, botão #c4572a, raio 16px. Este envia de verdade a
                validação.
              </p>
            </div>
          <Card className="border-border bg-card shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Mensagem</CardTitle>
              <CardDescription>
                Validação com zod. O envio não chama nenhum serviço.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alex Maciel"
                            autoComplete="name"
                            className={fieldClass}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="alex@email.com"
                            autoComplete="email"
                            className={fieldClass}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Uma frase sobre o que você precisa."
                            className={`${fieldClass} min-h-28 resize-none`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className={buttonClass}
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Enviando" : "Enviar mensagem"}
                    <Send className="size-4" />
                  </Button>
                  {notice ? (
                    <p role="status" className="text-sm text-primary">
                      {notice}
                    </p>
                  ) : null}
                </form>
              </Form>
            </CardContent>
          </Card>
          </section>
        </div>
      </div>
      <Toaster theme="dark" position="bottom-right" duration={8000} />
    </>
  );
}

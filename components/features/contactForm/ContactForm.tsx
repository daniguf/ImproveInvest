"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "firstNameRequired"),
  lastName: z.string().min(1, "lastNameRequired"),
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
  phone: z.string().min(1, "phoneRequired"),
  subject: z.string().min(1, "subjectRequired"),
  message: z.string().min(1, "messageRequired").min(10, "messageMin"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container text-black">
      {submitStatus === "success" && (
        <div className="form-success">{t("success")}</div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {t("error")}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              {t("firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-input ${errors.firstName ? "error" : ""}`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="form-error">
                {t(`validation.${errors.firstName.message}`)}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              {t("lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-input ${errors.lastName ? "error" : ""}`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="form-error">
                {t(`validation.${errors.lastName.message}`)}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            className={`form-input ${errors.email ? "error" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="form-error">
              {t(`validation.${errors.email.message}`)}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            className={`form-input ${errors.phone ? "error" : ""}`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="form-error">
              {t(`validation.${errors.phone.message}`)}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            {t("subject")}
          </label>
          <input
            type="text"
            id="subject"
            className={`form-input ${errors.subject ? "error" : ""}`}
            {...register("subject")}
          />
          {errors.subject && (
            <p className="form-error">
              {t(`validation.${errors.subject.message}`)}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            {t("message")}
          </label>
          <textarea
            id="message"
            className={`form-input form-textarea ${errors.message ? "error" : ""}`}
            {...register("message")}
          />
          {errors.message && (
            <p className="form-error">
              {t(`validation.${errors.message.message}`)}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}

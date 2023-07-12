"use client";
import { Form } from "@/types/schemas";
import React, { useState } from "react";
import VAlert from "./VAlert";
import { useRouter, useSearchParams } from "next/navigation";

interface FormProps {
  form: Form;
}
function transformSchema(schema: Array<{}>) {
  return schema.map((item) => {
    const newItem = { ...item };
    newItem.$formkit = newItem.type;
    switch (newItem.width) {
      case "33":
        newItem.outerClass = "md:col-span-2";
        break;
      case "50":
        newItem.outerClass = "md:col-span-3";
        break;
      case "67":
        newItem.outerClass = "md:col-span-4";
        break;
      case "100":
        newItem.outerClass = "md:col-span-6";
        break;
      default:
        newItem.outerClass = "md:col-span-6";
    }
    return newItem;
  });
}

function VForm(props: FormProps) {
  const { form } = props;

  const query = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({ ...query });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const schema = transformSchema(form.schema);

  async function submitForm() {
    setLoading(true);
    try {
      // Replace $directus.items('inbox').createOne with the appropriate API call in your React code
      // Pass formData as the data payload
      // Handle success and redirect logic accordingly
      setSuccess(true);
      if (form.on_success === "redirect") {
        return router.push(props.form.redirect_url as string);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-4">
        {error && <VAlert type="error">Oops! {error}</VAlert>}
        {form.on_success === "message" && success && (
          <VAlert
            type="success"
            html={
              form.success_message ?? "Success! Your form has been submitted."
            }
          ></VAlert>
        )}
      </div>
      {!success && (
        <FormKit
          type="form"
          value={formData}
          onSubmit={submitForm}
          submitLabel={form.submit_label}
        >
          <div className="grid gap-6 md:grid-cols-6">
            <FormKitSchema schema={schema} />
          </div>
        </FormKit>
      )}
    </div>
  );
}

export default VForm;

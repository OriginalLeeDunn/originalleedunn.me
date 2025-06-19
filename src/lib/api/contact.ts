import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function submitContactForm(data: ContactFormData) {
  try {
    // Simulate API call (replace with actual API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real implementation, you would do something like:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to send message');
    // }

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

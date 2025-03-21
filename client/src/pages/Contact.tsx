import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Newsletter from "@/components/home/Newsletter";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div>
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-8">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Get in Touch</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-opacity-90 text-white font-['Montserrat'] font-medium py-3 px-8 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Store Information</h2>
              
              <div className="space-y-8">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Our Store</h3>
                    <p className="text-gray-600">
                      58 Model Town<br />
                      Rohtak<br />
                      Haryana, India 124001
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-phone-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                    <p className="text-gray-600">
                      +91 9896626916<br />
                      Monday – Friday: 10am – 6pm<br />
                      Saturday: 11am – 4pm
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-gray-600">
                      info@kalabyharvansh.com<br />
                      support@kalabyharvansh.com<br />
                      orders@kalabyharvansh.com
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <i className="fas fa-share-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 text-gray-600">
                      <a href="#" className="hover:text-secondary transition">
                        <i className="fab fa-facebook-f text-xl"></i>
                      </a>
                      <a href="#" className="hover:text-secondary transition">
                        <i className="fab fa-instagram text-xl"></i>
                      </a>
                      <a href="#" className="hover:text-secondary transition">
                        <i className="fab fa-pinterest-p text-xl"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13989.217785336697!2d76.59242358073702!3d28.882659122779485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a7b49da9d9%3A0xf424ea39224a6fcc!2sModel%20Town%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1711629693374!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default Contact;

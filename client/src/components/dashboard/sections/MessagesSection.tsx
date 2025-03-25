import { useState } from "react";
import { Message } from "../../../types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";

interface MessagesSectionProps {
  messages: Message[];
  onAddMessage: (message: Message) => void;
  onDeleteMessage: (id: string) => void;
}

const messageSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Message content is required"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function MessagesSection({ messages, onAddMessage, onDeleteMessage }: MessagesSectionProps) {
  const { toast } = useToast();
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const onSubmit = (data: MessageFormValues) => {
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      subject: data.subject,
      content: data.content,
      sender: "You",
      createdAt: new Date(),
    };
    
    onAddMessage(newMessage);
    setShowNewMessageForm(false);
    form.reset();
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
      variant: "default",
    });
  };

  const handleDelete = (id: string) => {
    onDeleteMessage(id);
    toast({
      title: "Message deleted",
      description: "Message has been deleted successfully.",
      variant: "default",
    });
  };

  return (
    <section className="space-y-6">
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-slate-900">Messages</h2>
            <Button 
              className="mt-3 sm:mt-0" 
              onClick={() => setShowNewMessageForm(true)}
            >
              <i className="ri-mail-add-line mr-2"></i>
              <span>New Message</span>
            </Button>
          </div>
        </div>

        {/* New Message Form */}
        {showNewMessageForm && (
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h3 className="text-md font-medium text-slate-900 mb-4">Send a New Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..." 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewMessageForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Messages List */}
        <div className="divide-y divide-slate-200">
          {messages.length > 0 ? (
            messages.map(message => (
              <div key={message.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-3">
                      <i className="ri-user-fill"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{message.subject}</h3>
                      <p className="text-slate-600 mt-1">{message.content}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-slate-500">From: {message.sender}</span>
                        <span className="mx-2 text-slate-300">•</span>
                        <span className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                    <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                      <i className="ri-reply-line"></i>
                    </button>
                    <button 
                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                      onClick={() => handleDelete(message.id)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <div className="mb-3 flex justify-center">
                <i className="ri-mail-line text-4xl text-slate-300"></i>
              </div>
              <h3 className="text-slate-700 font-medium mb-1">No messages yet</h3>
              <p className="text-slate-500 text-sm mb-4">Send your first message to get started</p>
              <Button onClick={() => setShowNewMessageForm(true)}>
                <i className="ri-mail-add-line mr-2"></i>
                <span>New Message</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}

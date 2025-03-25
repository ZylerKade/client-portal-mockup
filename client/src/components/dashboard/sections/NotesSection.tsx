import { useState } from "react";
import { Note } from "../../../types";
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

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Note content is required"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export default function NotesSection({ notes, onAddNote, onDeleteNote }: NotesSectionProps) {
  const { toast } = useToast();
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: NoteFormValues) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: data.title,
      content: data.content,
      createdAt: new Date(),
    };
    
    onAddNote(newNote);
    setShowNewNoteForm(false);
    form.reset();
    
    toast({
      title: "Note added",
      description: "Your note has been added successfully.",
      variant: "default",
    });
  };

  const handleDelete = (id: string) => {
    onDeleteNote(id);
    toast({
      title: "Note deleted",
      description: "Note has been deleted successfully.",
      variant: "default",
    });
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <h2 className="text-lg font-medium text-slate-900">Notes</h2>
            <Button 
              className="mt-3 sm:mt-0" 
              onClick={() => setShowNewNoteForm(true)}
            >
              <i className="ri-add-line mr-2"></i>
              <span>Add Note</span>
            </Button>
          </div>

          {/* New Note Form */}
          {showNewNoteForm && (
            <div className="mb-6 p-5 border border-slate-200 rounded-lg bg-slate-50">
              <h3 className="text-md font-medium text-slate-900 mb-4">Add a New Note</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Note title" {...field} />
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
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your note content..." 
                            rows={3} 
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
                      onClick={() => setShowNewNoteForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Note
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.length > 0 ? (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-slate-900">{note.title}</h3>
                    <div className="flex space-x-1">
                      <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button 
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                        onClick={() => handleDelete(note.id)}
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{note.content}</p>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    Created {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center">
                <div className="mb-3 flex justify-center">
                  <i className="ri-sticky-note-line text-4xl text-slate-300"></i>
                </div>
                <h3 className="text-slate-700 font-medium mb-1">No notes yet</h3>
                <p className="text-slate-500 text-sm mb-4">Add your first note to get started</p>
                <Button onClick={() => setShowNewNoteForm(true)}>
                  <i className="ri-add-line mr-2"></i>
                  <span>Add Note</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

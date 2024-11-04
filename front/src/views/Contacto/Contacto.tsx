import ContactForm from "@/components/Contact/Contact";

const ContactoView = () => {
    return (
      <div className="flex flex-wrap items-center gap-4 justify-center container mx-auto p-4">
        <h1 className="text-2xl text-accent font-bold text-center m-4">Contacto</h1>
        <p className="text-center text-sm font-extralight text-secondary m-8">Si tienes alguna pregunta, por favor completa el formulario a continuación y nos pondremos en contacto contigo pronto.</p>
        <ContactForm />
      </div>
      )
}

export default ContactoView;



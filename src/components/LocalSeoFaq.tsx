import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQS = [
  {
    question: 'Which areas does Wok & Toss serve?',
    answer:
      'Wok & Toss serves customers across Rawalpindi and Islamabad, Pakistan. Because delivery arrangements depend on daily dispatch capacity and route timing, customers message their area on WhatsApp to confirm delivery options for their sector or neighborhood.',
  },
  {
    question: 'What are the opening hours of Wok & Toss?',
    answer:
      'Wok & Toss operates every day from 12:30 PM to 11:00 PM (Monday through Sunday), preparing hot, wok-tossed Chinese meals for lunch, dinner, and late evening cravings.',
  },
  {
    question: 'Can spice levels be adjusted for dishes?',
    answer:
      'Yes. The original Wok & Toss spice charts confirm that heat levels can be customized. Whether you prefer a mild garlic stir-fry, balanced medium pepper heat, or blistered firecracker chili, specify your preference when messaging on WhatsApp.',
  },
  {
    question: "How do I get today's menu and current pricing?",
    answer:
      'To receive today’s menu and prices, send a WhatsApp message with the word "MENU" to +92 319 1932923. You can also view our full catalog of dishes here on the website.',
  },
  {
    question: 'How do I place an order with Wok & Toss?',
    answer:
      'Ordering is straightforward: 1) Browse the menu online or message "MENU" on WhatsApp. 2) Pick your dishes and desired heat levels. 3) Send a WhatsApp message to +92 319 1932923 including your delivery area and the number of people ordering for. 4) Confirm current pricing and delivery timing directly with our WhatsApp dispatch team.',
  },
];

export default function LocalSeoFaq() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-warmPorcelain text-smokedSoy border-t border-ricePaper-dark/40" id="faqs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold text-mutedText block mb-1">
            Questions and answers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-smokedSoy">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-mutedText font-sans">
            Clear information about our food preparation, Twin Cities delivery, and WhatsApp ordering process.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group bg-warmPorcelain-card rounded-2xl border border-ricePaper-dark/70 p-6 transition-all duration-200 open:shadow-md open:border-toastedSesame/40"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none focus:outline-none">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-smokedSoy group-open:text-roastedChilli transition-colors pr-4">
                  {faq.question}
                </h3>
                <ChevronDown className="w-5 h-5 text-toastedSesame transition-transform duration-200 group-open:rotate-180 shrink-0" />
              </summary>
              <p className="mt-4 text-sm sm:text-base text-mutedText leading-relaxed border-t border-ricePaper-dark/40 pt-4 font-sans">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

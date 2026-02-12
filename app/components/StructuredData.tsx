"use client";

export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Cacao Mobile",
        "description": "We create mobile products that turn ideas into scalable growth",
        "url": "https://cacao-mobile.com",
        "logo": "https://cacao-mobile.com/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/cacao-mobile-sp-z-o-o/",
            "https://apps.apple.com/us/developer/cacao-mobile/id1612079536",
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "hr@cacao-mobile.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PL"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}

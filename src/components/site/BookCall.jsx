import { bookingHref, company } from "@/content/company";
import { Button } from "./ui";

/**
 * "Book a call", wherever it appears. With a calendar link set it opens the
 * calendar in a new tab; without one it goes to the booking block on the
 * contact page.
 */
export default function BookCall({ children = "Book a call", variant = "eu", className = "" }) {
  const external = Boolean(company.booking);
  return (
    <Button
      href={bookingHref}
      variant={variant}
      external={external}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Button>
  );
}

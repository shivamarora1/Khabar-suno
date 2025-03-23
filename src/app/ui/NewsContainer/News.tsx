import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardImage,
} from "@progress/kendo-react-layout";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

interface Card {
  author_name: string;
  content: string;
  source_url: string;
  source_name: string;
  title: string;
  image_url: string;
  created_at: number;
}

export const NewsComponent = ({ card }: { card: Card }) => {
  return (
    <Card
      className="!flex-col sm:!flex-row !mt-[15px]"
      style={{
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
      }}
    >
      <CardImage
        className="sm:!w-[300px] sm:!max-w-[300px]"
        src={card.image_url}
      />

      <div className="k-vbox">
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>
          <CardSubtitle>
            By {card.author_name} on {formatDate(card.created_at)}
          </CardSubtitle>
        </CardHeader>
        <CardBody>{card.content}</CardBody>
        <CardFooter>
          Read more on{" "}
          <a
            title={`Click here to read more on ${card.source_name}`}
            href={card.source_url}
            target="_blank"
          >
            <b>{card.source_name}</b>
          </a>
        </CardFooter>
      </div>
    </Card>
  );
};

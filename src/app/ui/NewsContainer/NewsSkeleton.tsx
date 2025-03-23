import * as React from "react";

import { Skeleton } from "@progress/kendo-react-indicators";

import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardBody,
} from "@progress/kendo-react-layout";

export const NewsComponentSkeleton = () => {
  return (
    <Card
      className="!flex-col sm:!flex-row !mt-[15px]"
      style={{
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
      }}
    >
      <Skeleton
        className="sm:!w-[300px] sm:!max-w-[300px]"
        shape={"rectangle"}
        style={{ height: 230 }}
      />
      <div className="k-vbox w-1/1 sm:w-3/5">
        <CardHeader>
          <CardTitle>
            <Skeleton shape={"text"} />
          </CardTitle>
          <CardSubtitle>
            <Skeleton shape={"text"} className="w-3/5" />
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <Skeleton shape={"text"} />
          <Skeleton shape={"text"} />
          <Skeleton shape={"text"} />
        </CardBody>
        <CardFooter>
          <Skeleton shape={"text"} className="w-2/5" />
        </CardFooter>
      </div>
    </Card>
  );
};

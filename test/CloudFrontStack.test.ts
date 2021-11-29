import { Template } from "@aws-cdk/assertions";
import * as cdk from "@aws-cdk/core";
import { CloudFrontStack } from "../lib/CloudFront";

test("Snapshot Test", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CloudFrontStack(app, "WebAcl", { webAclArn: "test-arn" });

  // THEN
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

import { Template } from "@aws-cdk/assertions";
import * as cdk from "@aws-cdk/core";
import { WebAclStack } from "../lib/WafStack";

test("Snapshot Test", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new WebAclStack(app, "WebAcl");

  // THEN
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

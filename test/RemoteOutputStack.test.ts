import { Template } from "@aws-cdk/assertions";
import * as cdk from "@aws-cdk/core";
import { WebAclStack } from "../lib/WafStack";
import { RemoteOutputStack } from "../lib/RemoteOutputStack";

test("Snapshot Test", () => {
  const app = new cdk.App();

  // WHEN
  const stack = new RemoteOutputStack(app, "WebAcl", {
    webAcl: new WebAclStack(app, "WebAclStack"),
  });

  // THEN
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});

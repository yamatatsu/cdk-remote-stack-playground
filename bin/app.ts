import * as cdk from "@aws-cdk/core";
import { WebAclStack } from "../lib/WafStack";
import { RemoteOutputStack } from "../lib/RemoteOutputStack";
import { CloudFrontStack } from "../lib/CloudFront";

const PREFIX = "cdk-remote-stack-playground";
const app = new cdk.App();

const webAcl = new WebAclStack(app, `${PREFIX}-WebAcl`, {
  env: { region: "us-east-1" },
});
new cdk.CfnOutput(webAcl, "WebAclArn", { value: webAcl.webAclArn });

const remoteOutput = new RemoteOutputStack(app, `${PREFIX}-RemoteOutput`, {
  webAcl,
});

new CloudFrontStack(app, `${PREFIX}-CloudFront`, {
  webAclArn: remoteOutput.webAclArn,
});

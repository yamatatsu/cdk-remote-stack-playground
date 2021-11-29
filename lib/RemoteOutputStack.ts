import { RemoteOutputs } from "cdk-remote-stack";
import * as cdk from "@aws-cdk/core";
import { WebAclStack } from "./WafStack";

const outputKey = "WebAclArn";

type Props = cdk.StackProps & {
  webAcl: WebAclStack;
};

export class RemoteOutputStack extends cdk.Stack {
  public readonly webAclArn: string;

  public static makeOutputWebAclArn(webAcl: WebAclStack) {
    new cdk.CfnOutput(webAcl, outputKey, { value: webAcl.webAclArn });
  }

  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props);

    this.addDependency(props.webAcl);
    const outputs = new RemoteOutputs(this, "Outputs", { stack: props.webAcl });
    const webAclArn = outputs.get(outputKey);

    this.webAclArn = webAclArn;
  }
}

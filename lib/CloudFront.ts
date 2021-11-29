import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as cdk from "@aws-cdk/core";

type Props = cdk.StackProps & {
  webAclArn: string;
};

export class CloudFrontStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props);

    new cloudfront.CloudFrontWebDistribution(this, "Distribution", {
      webACLId: props.webAclArn,
      originConfigs: [
        {
          customOriginSource: {
            domainName: "dev.classmethod.jp",
          },
          behaviors: [
            {
              isDefaultBehavior: true,
            },
          ],
        },
      ],
    });
  }
}

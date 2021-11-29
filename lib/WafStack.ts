import * as wafv2 from "@aws-cdk/aws-wafv2";
import * as cdk from "@aws-cdk/core";

export class WebAclStack extends cdk.Stack {
  public readonly webAclArn: string;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const acl = new wafv2.CfnWebACL(this, "CommonAcl", {
      defaultAction: {
        allow: {},
      },
      description: "CommonAcl",
      name: "CommonAcl",
      rules: [
        {
          name: "AWSCommonRule",
          priority: 0,
          overrideAction: {
            none: {},
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: "RuleWithAWSManagedRulesMetric",
          },
          statement: {
            managedRuleGroupStatement: {
              excludedRules: [],
              name: "AWSManagedRulesCommonRuleSet",
              vendorName: "AWS",
            },
          },
        },
      ],
      scope: "CLOUDFRONT",
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: "CommonAclMetric",
      },
    });

    this.webAclArn = acl.attrArn;
  }
}

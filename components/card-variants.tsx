import { InteractiveCard, type CardIcon } from "@/components/interactive-card";

type Props = { icon: CardIcon; title: string; copy: string; meta?: string };
export function FeatureCard(props: Props) { return <InteractiveCard kind="feature" {...props} meta={props.meta ?? "Feature"} />; }

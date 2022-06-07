import Badge from "components/Badge/Badge";
import { YesNo } from "enums";

interface RelationshipToBusinessProps {
  relationship?: string;
  setRelationship(e?: string): void;
}

const RelationshipToBusiness = (props: RelationshipToBusinessProps) => {
  const { relationship, setRelationship } = props;
  return (
    <div className="flex gap-2">
      <Badge
        onClick={(e) => setRelationship(e)}
        value={YesNo.YES}
        selected={YesNo.YES === relationship}
        text={YesNo.YES}
      />
      <Badge
        onClick={(e) => setRelationship(e)}
        value={YesNo.NO}
        selected={YesNo.NO === relationship}
        text={YesNo.NO}
      />
    </div>
  );
};

export default RelationshipToBusiness;

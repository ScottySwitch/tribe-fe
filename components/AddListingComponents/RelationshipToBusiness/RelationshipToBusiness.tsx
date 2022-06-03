import Badge from "components/Badge/Badge";

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
        value="yes"
        selected={"yes" === relationship}
        text="Yes"
      />
      <Badge
        onClick={(e) => setRelationship(e)}
        value="no"
        selected={"no" === relationship}
        text="No"
      />
    </div>
  );
};

export default RelationshipToBusiness;

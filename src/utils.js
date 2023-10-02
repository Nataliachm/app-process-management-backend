const updateManyToManyRelations = async (
  model,
  itemId,
  newRelatedItems,
  oldRelatedItems,
  relationField
) => {
  try {
    const added = difference(newRelatedItems, oldRelatedItems);
    const removed = difference(oldRelatedItems, newRelatedItems);

    await model.updateMany(
      { _id: added },
      { $addToSet: { [relationField]: itemId } }
    );

    await model.updateMany(
      { _id: removed },
      { $pull: { [relationField]: itemId } }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const difference = (A, B) => {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
};

module.exports = {
  updateManyToManyRelations,
};

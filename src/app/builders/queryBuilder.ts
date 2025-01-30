import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search
      ? String(this?.query?.search).trim()
      : '';

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field: string) => ({
          [field]: { $regex: search, $options: 'i' }, // Case-insensitive search
        })),
      } as FilterQuery<T>);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Exclude fields related to search, sorting, etc.
    const excludeFields = ['search', 'sortOrder', 'sortBy'];

    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.filter) {
      const authorId = queryObj.filter;

      // Check if the provided filter is a valid ObjectId
      if (
        typeof authorId === 'string' &&
        mongoose.Types.ObjectId.isValid(authorId)
      ) {
        queryObj.author = new mongoose.Types.ObjectId(authorId);
        delete queryObj.filter; // Remove filter to prevent conflicts
      } else {
        throw new Error('Invalid authorId format');
      }
    }

    // Apply filters only if the query object is not empty
    if (Object.keys(queryObj).length > 0) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy || 'createdAt'; // Sort by createdAt by default
    const sortOrder = this?.query?.sortOrder || 'desc'; // Default to descending order
    const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;

    this.modelQuery = this.modelQuery.sort(sortStr);

    return this;
  }
}

export default QueryBuilder;

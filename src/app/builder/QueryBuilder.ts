import { Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  //   search method
  search(searchableFields: string[]) {
    if (this?.query?.search) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: this.query.search, $options: "i" },
        })),
      });
    }
    return this;
  }

  //   filter method

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ["search", "limit", "sort", "fields", "page"];
    excludeFields.forEach(el => delete queryObj[el]);
    this.queryModel = this.queryModel.find(queryObj);

    return this;
  }

  //   sort method
  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  //   paginate method
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  //   fields limiting method
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",").join(" ") || "-_v";
    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.queryModel.getFilter();
    const total = await this.queryModel.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;

import { Injectable } from "@nestjs/common";
import { Tree } from "./interfaces/tree.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ResponseService } from "../services/ResponseHandler/response-handler.service";
import { SearchEngineService } from "../services/Search/search.service";


@Injectable()
export class TreeService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel("Tree") private treeModel: Model<Tree>,
    private responseService: ResponseService
  ) {}

  async createTree(tree: Tree, req, res): Promise<Tree> {
    const newTree = new this.treeModel(tree);

    try {
      const chat_body = await newTree.save();
      if (chat_body) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: "Bot has been successfully deployed",
          chat_body,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: "Bot could not be deployed. Please try again",
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
  async findTree(id: string): Promise<Tree> {
    const conversationTree = this.treeModel.findOne({ _id: id });
    return conversationTree;
  }
  async findConversationByKeyword(
    id: string,
    keyword: string,
    req,
    res
  ): Promise<Tree> {
    try {
      const conversationTree =
        (await this.treeModel.findOne({ phone: id })) ||
        (await this.treeModel.findOne({ _id: id }));
      if (conversationTree) {
        const { chat_body } = conversationTree;
        const searchEngine = new SearchEngineService(chat_body);
        const result = await searchEngine.search(keyword);
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: "Your search was executed successfully.",
          data: result,
        });
      }

      return this.responseService.clientError(
        res,
        "Could not find a chat tree belonging to this identifier"
      );
    } catch (error) {
      return this.responseService.serverError(res, error.message);
    }
  }
  async findTreeByClient(clientId: string): Promise<Tree> {
    return await this.treeModel.find({ clientId }).populate("setting_id");
  }
  async findAllTrees(): Promise<Tree[]> {
    return await this.treeModel.find();
  }

  async getConvoById(id: string, searchId, res) {
    try {
      const conversationTree =
        (await this.treeModel.findOne({ phone: id })) ||
        (await this.treeModel.findOne({ _id: id }));
      const { chat_body } = conversationTree;
      const searchEngine = new SearchEngineService(chat_body);
      const result = await searchEngine.findById(
        searchId || chat_body[0].identity,
        chat_body
      );
      if (result) {
        return await this.responseService.requestSuccessful(res, {
          success: true,
          message: "your search result was successfully executed",
          data: result,
        });
      } else {
        return this.responseService.clientError(
          res,
          "Invalid input. Please try again with appropriate input."
        );
      }
    } catch (error) {
      return this.responseService.serverError(res, error.message);
    }
  }

  async updateTree(id: string, tree: Tree, req, res): Promise<Tree[]> {
    console.log(tree["chat_body"]);
    try {
      const isFound = await this.treeModel.find({ _id: id });
      if (!isFound) {
        return this.responseService.clientError(res, "Tree not found");
      }
      const updatedTree = await this.treeModel.findByIdAndUpdate(
        id,
        { chat_body: tree["chat_body"] },
        { new: true }
      );
      if (updatedTree) {
        return await this.responseService.requestSuccessful(res, {
          success: true,
          message: "Tree updated successfully",
        });
      }
      return this.responseService.clientError(
        res,
        "An error occured while updating the tree. Please try again"
      );
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }

  
}

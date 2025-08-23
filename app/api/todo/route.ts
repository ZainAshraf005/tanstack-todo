import { connectDB } from "@/config/db";
import { handleError } from "@/lib/error-handler";
import { Todo } from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

await connectDB();
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    if (!title)
      return NextResponse.json(
        { message: "title is required", success: false },
        { status: 400 }
      );

    const titleExists = await Todo.findOne({ title });
    if (titleExists)
      return NextResponse.json(
        { message: "todo is already available", success: false },
        { status: 400 }
      );

    const todo = await Todo.create({ title });
    return NextResponse.json(
      { message: "todo added", success: true, todo },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
export async function GET() {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json({ todos, success: true }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const { id, newTitle } = await req.json();

    // validations
    if (!id) {
      return NextResponse.json(
        { message: "id is required", success: false },
        { status: 400 }
      );
    }

    if (!newTitle) {
      return NextResponse.json(
        { message: "updating title is required", success: false },
        { status: 400 }
      );
    }

    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      return NextResponse.json(
        { message: "id is invalid", success: false },
        { status: 400 }
      );
    }

    const titleExists = await Todo.findOne({ title: newTitle });
    if (titleExists) {
      return NextResponse.json(
        { message: "this todo already exists", success: false },
        { status: 400 }
      );
    }

    // update todo instead of creating new one
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title: newTitle },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "todo updated successfully",
        todo: updatedTodo,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { message: "id is required", success: false },
        { status: 400 }
      );

    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "todo deleted successfully", todo, success: true },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

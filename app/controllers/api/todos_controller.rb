class Api::TodosController < ApplicationController
  # added this for degbugging with postman
  #skip_before_filter :verify_authenticity_token

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.create!(todo_params)
    render json: @todo
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy!
    render json: { 'id' => params[:id] }
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
    render json: @todo
  end


  private

  def todo_params
    params.require(:todos).permit(:title, :body, :done)
  end
end

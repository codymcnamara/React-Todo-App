class Api::StepsController < ApplicationController
  # added this for degbugging with postman
  #skip_before_filter :verify_authenticity_token

  def index
    if params.has_key?(:todo_id)
      @steps = Step.where(todo_id: params[:todo_id])
    else
      @steps = Step.all
    end
    render json: @steps
  end

  def create
    @step = Step.create!(step_params)
    render json: @step
  end

  def destroy
    @step = Step.find(params[:id])
    todo_id = @step.todo_id
    @step.destroy!
    render json: { 'step_id' => params[:id],  "todo_id" => todo_id}
  end

  def update
    @step = Step.find(params[:id])
    @step.update!(step_params)
    render json: @step
  end


  private

  def step_params
    params.require(:steps).permit(:todo_id, :body, :done)
  end
end

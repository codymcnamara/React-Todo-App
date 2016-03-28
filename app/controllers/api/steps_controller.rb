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
    @step.destroy!

    # rendering text instead of json since jquery not allowing
    # sucess callback for 'delete' request
    render text: params[:id].to_s
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

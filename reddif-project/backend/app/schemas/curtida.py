from pydantic import BaseModel


class CurtidaToggleRequest(BaseModel):
    post_id: int
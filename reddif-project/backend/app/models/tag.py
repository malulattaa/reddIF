from sqlalchemy import Integer, String, ForeignKey, Table, Column
from sqlalchemy.orm import relationship
from app.database import Base

post_tag = Table(
    "post_tag",
    Base.metadata,
    Column("post_id", Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)

class Tag(Base):
    __tablename__ = "tags"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False, unique=True)
    
    posts = relationship("Post", secondary=post_tag, back_populates="tags")
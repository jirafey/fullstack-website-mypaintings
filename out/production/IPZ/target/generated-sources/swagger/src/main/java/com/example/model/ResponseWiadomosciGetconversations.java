package com.example.model;

import java.util.Objects;
import com.example.model.ResponseWiadomosciGetconversationsConversations;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciGetconversations
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseWiadomosciGetconversations   {
  @JsonProperty("conversations")
  @Valid
  private List<ResponseWiadomosciGetconversationsConversations> conversations = null;

  public ResponseWiadomosciGetconversations conversations(List<ResponseWiadomosciGetconversationsConversations> conversations) {
    this.conversations = conversations;
    return this;
  }

  public ResponseWiadomosciGetconversations addConversationsItem(ResponseWiadomosciGetconversationsConversations conversationsItem) {
    if (this.conversations == null) {
      this.conversations = new ArrayList<>();
    }
    this.conversations.add(conversationsItem);
    return this;
  }

  /**
   * Get conversations
   * @return conversations
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseWiadomosciGetconversationsConversations> getConversations() {
    return conversations;
  }

  public void setConversations(List<ResponseWiadomosciGetconversationsConversations> conversations) {
    this.conversations = conversations;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciGetconversations responseWiadomosciGetconversations = (ResponseWiadomosciGetconversations) o;
    return Objects.equals(this.conversations, responseWiadomosciGetconversations.conversations);
  }

  @Override
  public int hashCode() {
    return Objects.hash(conversations);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciGetconversations {\n");
    
    sb.append("    conversations: ").append(toIndentedString(conversations)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

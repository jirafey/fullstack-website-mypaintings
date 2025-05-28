package com.example.model;

import java.util.Objects;
import com.example.model.ResponseWiadomosciGetmessagesMessages;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciGetmessages
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseWiadomosciGetmessages   {
  @JsonProperty("messages")
  @Valid
  private List<ResponseWiadomosciGetmessagesMessages> messages = null;

  public ResponseWiadomosciGetmessages messages(List<ResponseWiadomosciGetmessagesMessages> messages) {
    this.messages = messages;
    return this;
  }

  public ResponseWiadomosciGetmessages addMessagesItem(ResponseWiadomosciGetmessagesMessages messagesItem) {
    if (this.messages == null) {
      this.messages = new ArrayList<>();
    }
    this.messages.add(messagesItem);
    return this;
  }

  /**
   * Get messages
   * @return messages
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseWiadomosciGetmessagesMessages> getMessages() {
    return messages;
  }

  public void setMessages(List<ResponseWiadomosciGetmessagesMessages> messages) {
    this.messages = messages;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciGetmessages responseWiadomosciGetmessages = (ResponseWiadomosciGetmessages) o;
    return Objects.equals(this.messages, responseWiadomosciGetmessages.messages);
  }

  @Override
  public int hashCode() {
    return Objects.hash(messages);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciGetmessages {\n");
    
    sb.append("    messages: ").append(toIndentedString(messages)).append("\n");
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

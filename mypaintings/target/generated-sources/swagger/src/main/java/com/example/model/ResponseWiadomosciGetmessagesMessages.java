package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciGetmessagesMessages
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseWiadomosciGetmessagesMessages   {
  @JsonProperty("content")
  private String content = null;

  @JsonProperty("timestamp")
  private OffsetDateTime timestamp = null;

  public ResponseWiadomosciGetmessagesMessages content(String content) {
    this.content = content;
    return this;
  }

  /**
   * Get content
   * @return content
   **/
  @Schema(example = "Cześć, jak tam Twoje nowe obrazy?", description = "")
  
    public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public ResponseWiadomosciGetmessagesMessages timestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Get timestamp
   * @return timestamp
   **/
  @Schema(example = "2024-03-15T14:30:22Z", description = "")
  
    @Valid
    public OffsetDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(OffsetDateTime timestamp) {
    this.timestamp = timestamp;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciGetmessagesMessages responseWiadomosciGetmessagesMessages = (ResponseWiadomosciGetmessagesMessages) o;
    return Objects.equals(this.content, responseWiadomosciGetmessagesMessages.content) &&
        Objects.equals(this.timestamp, responseWiadomosciGetmessagesMessages.timestamp);
  }

  @Override
  public int hashCode() {
    return Objects.hash(content, timestamp);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciGetmessagesMessages {\n");
    
    sb.append("    content: ").append(toIndentedString(content)).append("\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
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
